import requests
import sys
from datetime import datetime, timedelta
import json

class Give2EatAPITester:
    def __init__(self, base_url="http://localhost:8001"):
        self.base_url = base_url
        self.token = "demo-token-123"  # Using demo token from auth.py
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        default_headers = {'Content-Type': 'application/json'}
        if self.token:
            default_headers['Authorization'] = f'Bearer {self.token}'
        
        if headers:
            default_headers.update(headers)

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=default_headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=default_headers)

            print(f"Response Status: {response.status_code}")
            print(f"Response Body: {response.text[:200]}...")

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")

            return success, response.json() if response.text else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test health endpoint"""
        return self.run_test("Health Check", "GET", "health", 200)

    def test_root_endpoint(self):
        """Test root endpoint"""
        return self.run_test("Root Endpoint", "GET", "", 200)

    def test_create_food_post(self):
        """Test creating a food post"""
        pickup_time = (datetime.utcnow() + timedelta(hours=2)).isoformat()
        
        food_data = {
            "donor_id": "demo-user-id",
            "title": "Test Food Donation",
            "description": "Fresh vegetables from my garden",
            "quantity": "5 boxes",
            "pickup_time": pickup_time,
            "latitude": 40.7128,
            "longitude": -74.0060,
            "address": "123 Test Street, New York, NY"
        }
        
        success, response = self.run_test(
            "Create Food Post",
            "POST",
            "api/food/",
            200,
            data=food_data
        )
        return response.get('id') if success else None

    def test_get_food_posts(self):
        """Test getting all food posts"""
        success, response = self.run_test(
            "Get Food Posts",
            "GET",
            "api/food/",
            200
        )
        return success

    def test_get_food_post_by_id(self, post_id):
        """Test getting a specific food post"""
        if not post_id:
            print("❌ Skipping - No post ID provided")
            return False
            
        success, response = self.run_test(
            "Get Food Post by ID",
            "GET",
            f"api/food/{post_id}",
            200
        )
        return success

    def test_unlock_food_location(self, post_id):
        """Test unlocking food location"""
        if not post_id:
            print("❌ Skipping - No post ID provided")
            return False
            
        success, response = self.run_test(
            "Unlock Food Location",
            "POST",
            f"api/food/{post_id}/unlock",
            200
        )
        return success

def main():
    print("🚀 Starting Give2Eat API Tests...")
    
    # Setup
    tester = Give2EatAPITester()

    # Test basic endpoints
    tester.test_health_check()
    tester.test_root_endpoint()

    # Test food endpoints
    tester.test_get_food_posts()
    
    # Create a food post and test related operations
    post_id = tester.test_create_food_post()
    print(f"Created post ID: {post_id}")
    
    if post_id:
        tester.test_get_food_post_by_id(post_id)
        tester.test_unlock_food_location(post_id)
    else:
        print("❌ Could not create post, skipping dependent tests")

    # Print results
    print(f"\n📊 Tests Summary:")
    print(f"Tests passed: {tester.tests_passed}/{tester.tests_run}")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("⚠️  Some tests failed!")
        return 1

if __name__ == "__main__":
    sys.exit(main())
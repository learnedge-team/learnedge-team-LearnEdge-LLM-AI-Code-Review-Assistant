import json
import urllib.request

url = "http://127.0.0.1:8000/api/v1/review-code"
data = {
    "question_id": "q1",
    "student_code": "def add(a, b):\n    return a - b"
}

req = urllib.request.Request(
    url,
    data=json.dumps(data).encode('utf-8'),
    headers={'Content-Type': 'application/json'}
)

try:
    with urllib.request.urlopen(req) as response:
        result = response.read()
        print(f"Success! Status: {response.status}")
        print(f"Response:\n{json.dumps(json.loads(result), indent=2)}")
except Exception as e:
    print(f"Error: {e}")
    if hasattr(e, 'read'):
        try:
            print("Server Response Data:", e.read().decode())
        except:
            pass

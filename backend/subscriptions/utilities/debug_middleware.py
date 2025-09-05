class DebugMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    def __call__(self, request):
        print(">>> DebugMiddleware running, Origin =", request.headers.get("Origin"))
        return self.get_response(request)
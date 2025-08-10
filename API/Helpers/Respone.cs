using Microsoft.AspNetCore.Mvc;

namespace API.Helpers
{
    public class ApiResponse
    {
        public int Code { get; set; }
        public string Msg { get; set; }
        public object? Data { get; set; }  // <- Nullable reference type

        public ApiResponse(int code, string msg, object? data = null)
        {
            Code = code;
            Msg = msg;
            Data = data ?? new { };
        }
    }

    public static class AppResponse
    {
        public static IActionResult Success(string msg = "Success", object? data = null, int code = 200)
        {
            return new JsonResult(new ApiResponse(code, msg, data));
        }

        public static IActionResult Error(string msg = "Fail", object? data = null, int code = 404)
        {
            return new JsonResult(new ApiResponse(code, msg, data));
        }
    }
}

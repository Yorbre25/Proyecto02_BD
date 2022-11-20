using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Cors;

namespace Backend.Controllers;

[ApiController]
[Route("/")]
[EnableCors("AllowAllOrigins")]
public class LoginController : Controller
{
    // Check if the entered credentials are correct and send a session cookie if they are.
    // Entrada:
        // loginInfo: LoginInfo object with  username and user's password.
    [HttpPost]
    [Route("login")]
    public async void login([FromBody] LoginInfo loginInfo){
        string username = loginInfo.username;
        string password = loginInfo.password;
        string userType = loginInfo.userType;
        bool isValidPassword = false;

        try
        {
            isValidPassword = PasswordValidator.ValidatePassword(username, password, userType);

            await GenerateCookieAsync(isValidPassword);
        }
        catch (System.Exception error)
        {
            await Response.WriteAsJsonAsync(new { error = error.Message });
        }
    }

    /// <summary>
    /// Cierra la sesión actual y elimina el cookie de sesión.
    /// </summary>
    [HttpGet]
    [Route("logout")]
    public async void logout()
    {
        try
        {
            await HttpContext.SignOutAsync();
        }
        catch (System.Exception error)
        {
            await Response.WriteAsJsonAsync(new { error = error.Message });
        }
    }

    /// <summary>
    /// Genera y envía un cookie de sesión si las credenciales son válidas.
    /// </summary>
    private async Task GenerateCookieAsync(bool isValidPassword)
    {
        if (isValidPassword)
        {
            var claims = new List<Claim> { new Claim("userType", "employee") };
            var identity = new ClaimsIdentity(claims, "AuthCookie");
            var principal = new ClaimsPrincipal(identity);

            await HttpContext.SignInAsync("AuthCookie", principal);
            await Response.WriteAsJsonAsync(new { status = "Ok" });
        }
        else
        {
            throw new Exception("Correo o contraseña incorrectos");
        }
    }
}

// Stores user username and password.
public struct LoginInfo
{
    public string username { get; set; }
    public string password { get; set; }
    public string userType { get; set; }

    public LoginInfo(string username, string password, string userType)
    {
        this.username = username;
        this.password = password;
        this.userType = userType;
    }
}

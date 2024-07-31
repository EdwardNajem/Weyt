using Microsoft.AspNetCore.Mvc;
using WeytBackend.Application.DTO;
using WeytBackend.Application.Services;
using WeytBackend.Domain.Entities;

namespace WeytBackend.WebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserServices _userServices;
        private readonly ITokenServies _tokenServies;

        public UserController(IUserServices userServices, ITokenServies tokenServies)
        {
            _userServices = userServices;
            _tokenServies = tokenServies;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDTO login)
        {
            User? user = await _userServices.Login(login);
            var token = _tokenServies.GenerateToken(login);


            if (user != null)
            {
                var response = new
                {
                    user,
                    token
                };
                return Ok(response);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Email or the password is incorrect!");
            }



        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup(UserSignUpDTO signup)
        {
            User? user = await _userServices.SignUp(signup);

            if (user == null)
            {
                return Ok(new { message = "User created successfully" });
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Email already exists");
            }
        }
    }
}

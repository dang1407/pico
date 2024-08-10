using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pico_Backend.Interface;
using Pico_Backend.Models;

namespace Pico_Backend.Controllers
{
    [Route("api/v1/user")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly IAuthenticateRepository _authenticateRepository;   
        public AuthenticateController(IAuthenticateRepository authenticateRepository) 
        {
            _authenticateRepository = authenticateRepository;   
        }

        [HttpPost]
        [Route("login")]
        public IActionResult LoginAsync([FromBody] Login loginModel)
        {
            var result = _authenticateRepository.Authenticate(loginModel);
            if(result) 
            {
                return Ok(result);  
            }
            else
            {
                return BadRequest("Invalid Credentials");
            } 
        }
    }
}

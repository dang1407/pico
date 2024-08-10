using Pico_Backend.Models;

namespace Pico_Backend.Interface
{
    public interface IAuthenticateRepository
    {
        bool Authenticate(Login loginModel);    
    }
}

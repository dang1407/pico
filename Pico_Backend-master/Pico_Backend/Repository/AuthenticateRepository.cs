using Pico_Backend.Interface;
using Pico_Backend.Models;

namespace Pico_Backend.Repository
{
    public class AuthenticateRepository : IAuthenticateRepository
    {
        public bool Authenticate(Login loginModel)
        {
            string userName = "MinhStore";
            string password = "MinhStore123";
            if(loginModel.UserName == userName && loginModel.Password == password) 
            {
                return true;
            } 
            else
            {
                return false;   
            }
        }
    }
}

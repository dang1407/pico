using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pico_Backend.Interface;
using Pico_Backend.Models;

namespace Pico_Backend.Controllers
{
    [Route("api/v1/RiceCooker")]
    [ApiController]
    public class CookerController : BaseController<Cooker>
    {
        public CookerController(ICookerRepository cookerRepository) : base(cookerRepository) { }    
    }
}

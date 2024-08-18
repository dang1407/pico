using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pico_Backend.Interface;
using Pico_Backend.Models;

namespace Pico_Backend.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class WashingMachineController : BaseController<WashingMachine>
    {
        private readonly IWashingMachineRepository _washingMachineRepository;
        public WashingMachineController(IWashingMachineRepository washingMachineRepository) : base(washingMachineRepository) { }  
    }
}

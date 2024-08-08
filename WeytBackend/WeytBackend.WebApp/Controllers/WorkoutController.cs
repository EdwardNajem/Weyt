using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WeytBackend.Application.DTO;
using WeytBackend.Application.Services;
using WeytBackend.Domain.Entities;

namespace WeytBackend.WebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkoutController : Controller
    {
        private readonly IWorkoutServices _workoutServices;

        public WorkoutController(IWorkoutServices workoutServices)
        {
            _workoutServices = workoutServices;
        }

       
        [HttpGet("getAllExercises")]
        public async Task<IActionResult> GettAllExercises()
        {
           IEnumerable<Exercise> exercises = await _workoutServices.GetAllExercises();
            return Ok(exercises);
        }

        [HttpPost("CreateWorkoutRoutine")]
        public async Task<IActionResult> CreateWorkoutRoutine(CreateWorkoutRoutineDTO workoutRoutineDTO)
        {
            await _workoutServices.CreateWorkoutRoutine(workoutRoutineDTO);
            return Ok();
        }
    }
}

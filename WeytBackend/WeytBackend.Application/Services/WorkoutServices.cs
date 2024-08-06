using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeytBackend.Domain.Entities;
using WeytBackend.Infrastructure.Repository;

namespace WeytBackend.Application.Services
{
    public interface IWorkoutServices
    {
        public Task<IEnumerable<Exercise>> GetAllExercises();
    }
    public class WorkoutServices : IWorkoutServices
    {
        private readonly IWorkoutRepository _workoutRepository;

        public WorkoutServices(IWorkoutRepository workoutRepository)
        {
            _workoutRepository = workoutRepository;
        }

        public async Task<IEnumerable<Exercise>> GetAllExercises()
        {
           return await _workoutRepository.GetAllExerciseListAsync();
        }
    }
}

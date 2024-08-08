using WeytBackend.Application.DTO;
using WeytBackend.Domain.Entities;
using WeytBackend.Infrastructure.Repository;

namespace WeytBackend.Application.Services
{
    public interface IWorkoutServices
    {
        public Task<IEnumerable<Exercise>> GetAllExercises();
        public Task CreateWorkoutRoutine(CreateWorkoutRoutineDTO createWorkoutRoutineDTO);
    }
    public class WorkoutServices : IWorkoutServices
    {
        private readonly IWorkoutRepository _workoutRepository;
        private readonly IUserRepository _userRepository;

        public WorkoutServices(IWorkoutRepository workoutRepository, IUserRepository userRepository)
        {
            _workoutRepository = workoutRepository;
            _userRepository = userRepository;   
        }

        public async Task<IEnumerable<Exercise>> GetAllExercises()
        {
            return await _workoutRepository.GetAllExerciseListAsync();
        }

        public async Task CreateWorkoutRoutine(CreateWorkoutRoutineDTO createWorkoutRoutineDTO)
        {

            User user = await _userRepository.Login(createWorkoutRoutineDTO.UserEmail);

            var workoutRoutineId = await _workoutRepository.CreateWorkoutRoutine(createWorkoutRoutineDTO.Title, user.Id);

            foreach (CreateWorkoutDTO workoutDTO in createWorkoutRoutineDTO.Workout)
            {
                int workoutId = await _workoutRepository.CreateWorkout(workoutRoutineId, workoutDTO.ExerciseId);

                foreach (CreateExerciseSetDTO exerciseSetDTO in workoutDTO.ExerciseSet)
                {
                    await _workoutRepository.CreateExerciseSet(exerciseSetDTO.Reps, exerciseSetDTO.Weight, exerciseSetDTO.Duration!, workoutId, exerciseSetDTO.Number);
                }
            }


        }
    }
}

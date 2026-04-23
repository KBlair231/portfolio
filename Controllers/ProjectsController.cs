using System.Linq; // Add this using directive
using Microsoft.AspNetCore.Mvc;
using My_Portfolio.Models;

namespace My_Portfolio.Controllers {
	public class ProjectsController : Controller {
		private readonly List<ProjectsViewModel> _projects = new List<ProjectsViewModel>
		{
			new() {
				Id = 1,
				Title = "Movie Search Website",
				Description = "I connected this website to the TMDB api to allow a user to find movies by title. " +
				"The returned results can be clicked to display a card with relevant information about the movie.",
				ImageUrls = new List<string>
				{
					"/images/moviedb1.png",
					"/images/moviedb2.png",
					"/images/moviedb3.png",
					"/images/moviedb4.png",
					"/images/moviedb5.png"
				}
			},
			new() {
				Id = 2,
				Title = "Team Generator",
				Description = "Takes user input for names and a team size to randomly assign people to teams. " +
				"Once the teams are made the user can generate a random team name from a file of over 100 names.",
				ImageUrls = new List<string>
				{
					"/images/teamgen1.png",
					"/images/teamgen2.png",
					"/images/teamgen3.png",
					"/images/teamgen4.png",
					"/images/teamgen5.png",
					"/images/teamgen6.png"
				}
			},
			new() {
				Id = 3,
				Title = "Turn-Based Browser Game",
				Description = "Browser-based RPG with classes, passives, loot, equipment, and more!",
				RepoUrl = "https://github.com/KBlair231/TheCodeCowboysKB",
				ImageUrls = new List<string>
				{
					"/images/promptquest1.png",
					"/images/promptquest2.png",
					"/images/promptquest3.png",
					"/images/promptquest4.png",
					"/images/promptquest5.png",
					"/images/promptquest6.png",
					"/images/promptquest7.png"
				}
			}
		};
		public IActionResult Details(int id) 
		{
			var project = _projects.FirstOrDefault(p => p.Id == id); // Use the 'projects' field, not the class name
			if (project == null)	/* Check for proper parameters */
				return NotFound();
			return View(project);
		}
	}
}

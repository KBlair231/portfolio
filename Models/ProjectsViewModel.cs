namespace My_Portfolio.Models {
	public class ProjectsViewModel {
		public int Id { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public List<string> ImageUrls { get; set; }
		public string RepoUrl { get; set; }
	}
}

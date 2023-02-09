namespace SecurityEntity
{
    public abstract class BaseBranch
    {
        public int BranchId { get; set; }
        public int GroupId { get; set; }
        public string BranchName { get; set; }
        public string BranchShortName { get; set; }
        public string Address { get; set; }
        public string ContactNo { get; set; }
        public string Email { get; set; }
    }
}
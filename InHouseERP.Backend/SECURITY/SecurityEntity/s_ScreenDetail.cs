namespace SecurityEntity
{
    public class s_ScreenDetail
    {
        public int ScreenDetailId { get; set; }
        public int ScreenId { get; set; }
        public int FunctionId { get; set; }

        public string FunctionName { get; set; }
        //public bool CanExecute { get; set; }
        public bool IsActive { get; set; }
    }
}
namespace SecurityEntity
{
    public class s_PermissionDetail
    {
        public long PermissionDetailId { get; set; }
        public long PermissionId { get; set; }
        public int ScreenDetailId { get; set; }
        public bool CanExecute { get; set; }
        public int ScreenId { get; set; }
        public string FunctionName { get; set; }
    }
}
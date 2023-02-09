namespace SecurityEntity
{
    public class ad_Branch : BaseBranch
    {
        public string Fax { get; set; }
        public string Web { get; set; }
        public string Logo { get; set; }
        public string TIN { get; set; }
        public string VatRegNo { get; set; }
        public int? BranchTypeId { get; set; }
        public string GroupName { get; set; }
        public string ManagerName { get; set; }
        public bool IsActive { get; set; }
        public string Status { get; set; }
        public string TermsAndConditions { get; set; }
        public string PromotionalNotes { get; set; }
    }
}
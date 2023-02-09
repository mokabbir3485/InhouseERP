using System;

namespace PosEntity
{
    public class pos_CompanyEmployeeItem
    {
        public int ItemId { get; set; }
        public int PaperTypeId { get; set; }
        public int PreparedById { get; set; }
        public int PreparedBySectionId { get; set; }
        public int CompanyId { get; set; }
        public string ItemName { get; set; }
        public string ItemCode { get; set; }
        public string PrepareByName { get; set; }
        public string CompanyName { get; set; }

    }
}

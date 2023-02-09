using System;

namespace SecurityEntity
{
    public class s_Module
    {
        public int ModuleId { get; set; }
        public int DomainId { get; set; }
        public string ModuleName { get; set; }
        public string ModuleNameCustom { get; set; }
        public bool IsActive { get; set; }
        public short DisplayOrder { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int? UpdatorId { get; set; }
        public DateTime? UpdateDate { get; set; }
    }
}
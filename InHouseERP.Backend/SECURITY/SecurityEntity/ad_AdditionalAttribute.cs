using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_AdditionalAttribute : IEntityBase
    {
        public int AttributeId { get; set; }
        public string AttributeName { get; set; }
        public int ValueAvailibilityType { get; set; }
        public bool IsActive { get; set; }
        public string Status { get; set; }
        public string ValueAvailibilityTypeName { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}
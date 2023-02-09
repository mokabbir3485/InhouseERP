using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.SECURITY.SecurityEntity
{
    public class ad_MaterialType
    {
        public Int32 MaterialTypeId { get; set; }
        public string MaterialTypeName { get; set; }
        public string MaterialTypeDescription { get; set; }
        public string MaterialTypeCode { get; set; }
        public bool IsActive { get; set; }
        public Int32 CreatorId { get; set; }
        public Int32 UpdatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        

    }
}

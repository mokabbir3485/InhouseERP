using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.SECURITY.SecurityEntity
{
   public class ad_PaymentSubType
    {
        public int PaymentTypeId { get; set; }
        public string PaymentSubTypeName { get; set; }
        public bool IsActive { get; set; }
        public int PaymentSubTypeId { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public int CreatorId { get; set; }
        public int UpdatorId { get; set; }
        public string PaymentTypeName { get; set; }
        public int PaymentGroupId { get; set; }
    }
}

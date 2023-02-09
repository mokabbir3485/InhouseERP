using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.SECURITY.SecurityEntity
{

   public class ad_ItemCurrentStock
    {
        public int ItemAddAttId { get; set; }
        public int ItemId { get; set; }
        public string Barcode { get; set; }
        public bool IsActive { get; set; }
        public string AttributeName { get; set; }
        public int AttributeId { get; set; }
        public string Combination { get; set; }
        public string ItemNameDescription1And2 { get; set; }
        public decimal RollLenghtInMeter { get; set; }
        public decimal RollAreaInSqMeter { get; set; }
        public decimal RollWidthInMeter { get; set; }
        public decimal RollWeightInKg { get; set; }

        public string DepartmentName { get; set; }
        public decimal JumboCurrentQuantity { get; set; }
        public decimal CurrentQuantity { get; set; }
        public string SubCategoryName { get; set; }
        public string CategoryName { get; set; }
        public Int32 SubCategoryId { get; set; }
        public Int32 CategoryId { get; set; }
    }
}

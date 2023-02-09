using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_ItemSubCategory : IEntityBase
    {
        public int SubCategoryId { get; set; }
        public int CategoryId { get; set; }
        public int AssetNatureId { get; set; }
        public int SubCategoryTypeId { get; set; }
        public string SubCategoryName { get; set; }
        public string SubShortName { get; set; }
        public bool IsActive { get; set; }
        public string CategoryName { get; set; }
        public string AssetNatureName { get; set; }
        public string SubCategoryTypeName { get; set; }
        public string Status { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}
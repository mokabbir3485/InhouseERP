using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DbExecutor;

namespace SecurityEntity.SECURITY.SecurityEntity
{
    public class ad_FiscalYear : IEntityBase
    {
        public int FiscalYearId { get; set; }
        public int BranchId { get; set; }
        public string BranchName { get; set; }
        public string FiscalYearName { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public bool IsActive { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}

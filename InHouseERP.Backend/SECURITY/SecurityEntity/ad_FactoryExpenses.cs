using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity
{
    public class ad_FactoryExpenses
    {
        public int ExpenseId { get; set; }
        public string ExpenseNo { get; set; }
        public string BillReferenceNo { get; set; }
        public string EmployeeName { get; set; }
        public string Remarks { get; set; }
        public DateTime ExpenseDate { get; set; }
        public int EmployeeId { get; set; }
        public int PurposeId { get; set; }
        public string PurposeName { get; set; }
        public decimal Amount { get; set; }
        public int UpdatorId { get; set; }
        public int BranchId { get; set; }
        public string BranchName { get; set; }
    }
}

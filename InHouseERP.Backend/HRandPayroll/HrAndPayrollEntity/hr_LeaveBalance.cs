using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.HRandPayroll.HrAndPayrollEntity
{
   public class hr_LeaveBalance
    {

		public string EmployeeName { get; set; }
		public string EmployeeCode { get; set; }
		public string JoiningDate { get; set; }
		public string BranchName { get; set; }
		public string GradeName { get; set; }
		public string DepartmentName { get; set; }
		public string DesignationName { get; set; }
		public string SectionName { get; set; }
		public int DepartmentSerialNo { get; set; }

		public decimal Casual { get; set; }
		public decimal Sick { get; set; }
		public decimal BalanceCasual { get; set; }
		public decimal BalanceSick { get; set; }


    }
}

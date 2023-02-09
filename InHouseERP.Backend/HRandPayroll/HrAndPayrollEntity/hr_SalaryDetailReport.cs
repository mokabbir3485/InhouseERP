using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.HRandPayroll.HrAndPayrollEntity
{
    public class hr_SalaryDetailReport
    {

        public string JoiningDate { get; set; }
        public string EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public string BranchName { get; set; }
        public decimal TotalPaidAttendence { get; set; }
        public string DepartmentName { get; set; }
        public string DesignationName { get; set; }
        public decimal GrossSalary { get; set; }
        public decimal BasicSalary { get; set; }
        public decimal HouseRent { get; set; }
        public decimal MedicalAllowance { get; set; }
        public decimal ConveyanceAllowance { get; set; }
        public decimal LunchAllowance { get; set; }
        public decimal TotalB4Deduction { get; set; }
        public decimal TotalDays { get; set; }
        public decimal WorkingDays { get; set; }
        public decimal WeeklyHolidays { get; set; }
        public decimal PublicHolidays { get; set; }
        public decimal AbsentDays { get; set; }
        public int CasualLeave { get; set; }
        public int SickLeave { get; set; }
        public int EarnLeave { get; set; }
        public decimal OtHrs { get; set; }
        public decimal OtRate { get; set; }
        public decimal OtAmount { get; set; }
        public decimal DeductionAbsent { get; set; }
        public decimal DeductionProvFund { get; set; }
        public decimal DeductionTDS { get; set; }
        public decimal DeductionRevenueStamp { get; set; }
        public decimal DeductionAdvanceSalary { get; set; }
        public decimal OtherDeduction { get; set; }
        public decimal OtherAddition { get; set; }
        public string OtherDeductionRemarks { get; set; }
        public decimal NetPaymentBDT { get; set; }
        public decimal NetPaymentUSD { get; set; }
        public decimal CashPayment { get; set; }
        public decimal BankPayment { get; set; }

        public string FirstSignLabel { get; set; }
        public string SecondSignLabel { get; set; }
        public string ThirdSignLabel { get; set; }
        public string FourthSignLabel { get; set; }
        public string FifthSignLabel { get; set; }


    }
}

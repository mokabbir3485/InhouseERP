using System;
using System.Collections.Generic;

namespace HrAndPayrollEntity
{
    public class hr_Salary
    {
        public long SalaryId { get; set; }
        public int GradeId { get; set; }
        public int MonthId { get; set; }
        public int YearId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public decimal USDRate { get; set; }
        public string BasicFormula { get; set; }
        public string HouseRentFormula { get; set; }
        public string MedicalFormula { get; set; }
        public string ConveyanceFormula { get; set; }
        public string LunchFormula { get; set; }
        public string FirstSignLabel { get; set; }
        public string SecondSignLabel { get; set; }
        public string ThirdSignLabel { get; set; }
        public string FourthSignLabel { get; set; }
        public string FifthSignLabel { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int? UpdatorId { get; set; }
        public DateTime? UpdateDate { get; set; }
        public List<hr_SalaryDetail> SalaryDetailList { get; set; }
    }
}
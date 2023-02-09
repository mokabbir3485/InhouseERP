namespace HrAndPayrollBLL
{
    public static class Facade
    {
        public static hr_AttendancePolicyBLL hr_AttendancePolicy => new hr_AttendancePolicyBLL();
        public static hr_HolidayBLL hr_Holiday => new hr_HolidayBLL();
        public static hr_TypesBLL hr_Types => new hr_TypesBLL();
        public static hr_OverTimeTypeBLL hr_OverTimeType => new hr_OverTimeTypeBLL();
        public static hr_GradeBLL hr_Grade => new hr_GradeBLL();
        public static hr_ShiftBLL hr_Shift => new hr_ShiftBLL();
        public static hr_LeaveApplicationBLL hr_LeaveApplication => new hr_LeaveApplicationBLL();
        public static hr_LeaveTypeSetupBLL hr_LeaveTypeSetup => new hr_LeaveTypeSetupBLL();
        public static hr_BonusTypeSetupBLL hr_BonusTypeSetup => new hr_BonusTypeSetupBLL();
        public static hr_AllowanceTypeSetupBLL hr_AllowanceTypeSetup => new hr_AllowanceTypeSetupBLL();
        public static hr_UserBLL hr_User => new hr_UserBLL();
        public static hr_SalaryBLL hr_Salary => new hr_SalaryBLL();
        public static hr_SalaryDetailBLL hr_SalaryDetail => new hr_SalaryDetailBLL();
        public static hr_ContractTypeBLL hr_ContractType => new hr_ContractTypeBLL();
    }
}
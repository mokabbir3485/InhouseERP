using System;
using System.Collections.Generic;
using HrAndPayrollDAL;
using HrAndPayrollEntity;
using SecurityEntity.HRandPayroll.HrAndPayrollEntity;

namespace HrAndPayrollBLL
{
    public class hr_LeaveTypeSetupBLL //: IDisposible
    {
        public hr_LeaveTypeSetupBLL()
        {
            //hr_LeaveTypeSetupDAO = hr_LeaveTypeSetup.GetInstanceThreadSafe;
            hr_LeaveTypeSetupDAO = new hr_LeaveTypeSetupDAO();
        }

        public hr_LeaveTypeSetupDAO hr_LeaveTypeSetupDAO { get; set; }

        public List<hr_LeaveTypeSetup> GetByGradeId(int gradeId)
        {
            try
            {
                return hr_LeaveTypeSetupDAO.GetByGradeId(gradeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_LeaveTypeSetup> GetLeaveTypeByGradeId(int gradeId)
        {
            try
            {
                return hr_LeaveTypeSetupDAO.GetLeaveTypeByGradeId(gradeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_LeaveTypeSetup> GetEmployeeLeaveBalance(int employeeId, DateTime appDate)
        {
            try
            {
                return hr_LeaveTypeSetupDAO.GetEmployeeLeaveBalance(employeeId, appDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

       
        public List<hr_LeaveBalance> GetLeaveBalance(int YearId, int BranchId, int GradeId, int DepartmentId, int SectionId, int EmployeeId)
        {
            try
            {
                return hr_LeaveTypeSetupDAO.GetLeaveBalance(YearId, BranchId, GradeId, DepartmentId, SectionId, EmployeeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        

        public List<hr_LeaveTypeSetup> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return hr_LeaveTypeSetupDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_LeaveTypeSetup> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return hr_LeaveTypeSetupDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(hr_LeaveTypeSetup _hr_LeaveTypeSetup)
        {
            try
            {
                return hr_LeaveTypeSetupDAO.Add(_hr_LeaveTypeSetup);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(hr_LeaveTypeSetup _hr_LeaveTypeSetup)
        {
            try
            {
                return hr_LeaveTypeSetupDAO.Update(_hr_LeaveTypeSetup);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long LeaveOpeningBalanceCreate(hr_LeaveOpeningBalance _hr_LeaveOpeningBalance)
        {
            try
            {
                return hr_LeaveTypeSetupDAO.LeaveOpeningBalanceCreate(_hr_LeaveOpeningBalance);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int leaveSetupId)
        {
            try
            {
                return hr_LeaveTypeSetupDAO.Delete(leaveSetupId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
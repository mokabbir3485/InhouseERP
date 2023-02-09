using System;
using System.Collections.Generic;
using HrAndPayrollDAL;
using HrAndPayrollEntity;

namespace HrAndPayrollBLL
{
    public class hr_LeaveApplicationBLL //: IDisposible
    {
        public hr_LeaveApplicationBLL()
        {
            //hr_LeaveApplicationDAO = hr_LeaveApplication.GetInstanceThreadSafe;
            hr_LeaveApplicationDAO = new hr_LeaveApplicationDAO();
        }

        public hr_LeaveApplicationDAO hr_LeaveApplicationDAO { get; set; }

        public List<hr_LeaveApplication> GetForApproval()
        {
            try
            {
                return hr_LeaveApplicationDAO.GetForApproval();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_LeaveApplication> GetByBranchId(int branchId)
        {
            try
            {
                return hr_LeaveApplicationDAO.GetByBranchId(branchId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_LeaveApplication> GetByEmployeeId(int employeeId)
        {
            try
            {
                return hr_LeaveApplicationDAO.GetByEmployeeId(employeeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_LeaveApplication> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return hr_LeaveApplicationDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_LeaveApplication> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return hr_LeaveApplicationDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Save(hr_LeaveApplication _hr_LeaveApplication)
        {
            try
            {
                return hr_LeaveApplicationDAO.Save(_hr_LeaveApplication);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long SaveApproval(hr_LeaveApplication _hr_LeaveApplication)
        {
            try
            {
                return hr_LeaveApplicationDAO.SaveApproval(_hr_LeaveApplication);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long SaveForward(hr_LeaveApplication _hr_LeaveApplication)
        {
            try
            {
                return hr_LeaveApplicationDAO.SaveForward(_hr_LeaveApplication);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long leaveApplicationId)
        {
            try
            {
                return hr_LeaveApplicationDAO.Delete(leaveApplicationId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
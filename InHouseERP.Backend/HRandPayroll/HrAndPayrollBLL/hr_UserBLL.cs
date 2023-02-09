using System;
using System.Collections.Generic;
using HrAndPayrollDAL;
using HrAndPayrollEntity;

namespace HrAndPayrollBLL
{
    public class hr_UserBLL //: IDisposible
    {
        public hr_UserBLL()
        {
            //hr_UserDAO = hr_User.GetInstanceThreadSafe;
            hr_UserDAO = new hr_UserDAO();
        }

        public hr_UserDAO hr_UserDAO { get; set; }

        public List<hr_User> GetAll(int? hrUserId = null)
        {
            try
            {
                return hr_UserDAO.GetAll(hrUserId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_User> GetHrUserByUsernameAndPassword(string username, string password)
        {
            try
            {
                return hr_UserDAO.GetHrUserByUsernameAndPassword(username, password);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_User> GetHrUserByEmployeeId(int employeeId)
        {
            try
            {
                return hr_UserDAO.GetHrUserByEmployeeId(employeeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_User> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return hr_UserDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Save(hr_User _hr_User)
        {
            try
            {
                return hr_UserDAO.Save(_hr_User);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(hr_User _hr_User)
        {
            try
            {
                return hr_UserDAO.Update(_hr_User);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int HrUserChangePassword(int employeeId, string password)
        {
            try
            {
                return hr_UserDAO.HrUserChangePassword(employeeId, password);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int PostPrioritySequence(hr_User _hr_UserPrioritySequencee)
        {
            try
            {
                return hr_UserDAO.PostPrioritySequence(_hr_UserPrioritySequencee);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdatePrioritySequencee(hr_User _hr_UserPrioritySequencee)
        {
            try
            {
                return hr_UserDAO.UpdatePrioritySequencee(_hr_UserPrioritySequencee);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_User> GetPrioritySequenceeByBranchId(int branchId)
        {
            try
            {
                return hr_UserDAO.GetPrioritySequenceeByBranchId(branchId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
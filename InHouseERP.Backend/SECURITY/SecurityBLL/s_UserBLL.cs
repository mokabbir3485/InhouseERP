using System;
using System.Collections.Generic;
using System.Linq;
using HrAndPayrollEntity;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class s_UserBLL //: IDisposible
    {
        public s_UserBLL()
        {
            //s_UserDAO = s_User.GetInstanceThreadSafe;
            s_UserDAO = new s_UserDAO();
        }

        public s_UserDAO s_UserDAO { get; set; }

        public List<s_User> GetAll()
        {
            try
            {
                return s_UserDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public s_User GetByUserId(int userId)
        {
            try
            {
                return s_UserDAO.GetAll(userId).FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public s_User GetByEmployeeId(int employeeId)
        {
            try
            {
                return s_UserDAO.GetByEmployeeId(employeeId).FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public s_User GetByUsernameAndPassword(string username, string password)
        {
            try
            {
                return s_UserDAO.GetByUsernameAndPassword(username, password);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_User> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return s_UserDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_User> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return s_UserDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_User> HrUserGetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
           string sortOrder, ref int rows)
        {
            try
            {
                return s_UserDAO.HrUserGetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(s_User s_User)
        {
            try
            {
                return s_UserDAO.Add(s_User);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(s_User s_User)
        {
            try
            {
                return s_UserDAO.Update(s_User);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdatePassword(s_User s_User)
        {
            try
            {
                return s_UserDAO.UpdatePassword(s_User);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int userId)
        {
            try
            {
                return s_UserDAO.Delete(userId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
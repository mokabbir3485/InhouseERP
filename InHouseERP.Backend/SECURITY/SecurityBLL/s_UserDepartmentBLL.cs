using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class s_UserDepartmentBLL //: IDisposible
    {
        public s_UserDepartmentBLL()
        {
            //s_UserDepartmentDAO = s_UserDepartment.GetInstanceThreadSafe;
            s_UserDepartmentDAO = new s_UserDepartmentDAO();
        }

        public s_UserDepartmentDAO s_UserDepartmentDAO { get; set; }

        public List<s_UserDepartment> GetByUserId(int userId)
        {
            try
            {
                return s_UserDepartmentDAO.GetByUserId(userId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_UserDepartment> GetAllUserStore(int userId)
        {
            try
            {
                return s_UserDepartmentDAO.GetAllUserStore(userId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_UserDepartment> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return s_UserDepartmentDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_UserDepartment> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return s_UserDepartmentDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(s_UserDepartment _s_UserDepartment)
        {
            try
            {
                return s_UserDepartmentDAO.Add(_s_UserDepartment);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(s_UserDepartment _s_UserDepartment)
        {
            try
            {
                return s_UserDepartmentDAO.Update(_s_UserDepartment);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int userDepartmentId)
        {
            try
            {
                return s_UserDepartmentDAO.Delete(userDepartmentId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
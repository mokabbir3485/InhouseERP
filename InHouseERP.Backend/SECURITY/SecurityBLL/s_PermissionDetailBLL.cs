using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class s_PermissionDetailBLL //: IDisposible
    {
        public s_PermissionDetailBLL()
        {
            //s_PermissionDetailDAO = s_PermissionDetail.GetInstanceThreadSafe;
            s_PermissionDetailDAO = new s_PermissionDetailDAO();
        }

        public s_PermissionDetailDAO s_PermissionDetailDAO { get; set; }

        public List<s_PermissionDetail> GetAll()
        {
            try
            {
                return s_PermissionDetailDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_PermissionDetail> GetByPermissionId(long? permissionId = null)
        {
            try
            {
                return s_PermissionDetailDAO.GetByPermissionId(permissionId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_PermissionDetail> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return s_PermissionDetailDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_PermissionDetail> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return s_PermissionDetailDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(s_PermissionDetail _s_PermissionDetail)
        {
            try
            {
                return s_PermissionDetailDAO.Add(_s_PermissionDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(s_PermissionDetail _s_PermissionDetail)
        {
            try
            {
                return s_PermissionDetailDAO.Update(_s_PermissionDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long permissionDetailId)
        {
            try
            {
                return s_PermissionDetailDAO.Delete(permissionDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
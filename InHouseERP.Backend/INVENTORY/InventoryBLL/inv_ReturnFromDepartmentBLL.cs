using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_ReturnFromDepartmentBLL //: IDisposible
    {
        public inv_ReturnFromDepartmentBLL()
        {
            //inv_ReturnFromDepartmentDAO = inv_ReturnFromDepartment.GetInstanceThreadSafe;
            inv_ReturnFromDepartmentDAO = new inv_ReturnFromDepartmentDAO();
        }

        public inv_ReturnFromDepartmentDAO inv_ReturnFromDepartmentDAO { get; set; }

        public List<inv_ReturnFromDepartment> GetAll(long? returnId = null)
        {
            try
            {
                return inv_ReturnFromDepartmentDAO.GetAll(returnId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_ReturnFromDepartment> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return inv_ReturnFromDepartmentDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_ReturnFromDepartment> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return inv_ReturnFromDepartmentDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn,
                    sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(inv_ReturnFromDepartment _inv_ReturnFromDepartment)
        {
            try
            {
                return inv_ReturnFromDepartmentDAO.Add(_inv_ReturnFromDepartment);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(inv_ReturnFromDepartment _inv_ReturnFromDepartment)
        {
            try
            {
                return inv_ReturnFromDepartmentDAO.Update(_inv_ReturnFromDepartment);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateApprove(inv_ReturnFromDepartment _inv_ReturnFromDepartment)
        {
            try
            {
                return inv_ReturnFromDepartmentDAO.UpdateApprove(_inv_ReturnFromDepartment);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long returnId)
        {
            try
            {
                return inv_ReturnFromDepartmentDAO.Delete(returnId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
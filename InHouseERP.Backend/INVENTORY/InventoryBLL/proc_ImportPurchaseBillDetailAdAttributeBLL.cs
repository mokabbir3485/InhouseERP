using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class proc_ImportPurchaseBillDetailAdAttributeBLL //: IDisposible
    {
        public proc_ImportPurchaseBillDetailAdAttributeBLL()
        {
            //proc_ImportPurchaseBillDetailAdAttributeDAO = proc_ImportPurchaseBillDetailAdAttribute.GetInstanceThreadSafe;
            proc_ImportPurchaseBillDetailAdAttributeDAO = new proc_ImportPurchaseBillDetailAdAttributeDAO();
        }

        public proc_ImportPurchaseBillDetailAdAttributeDAO proc_ImportPurchaseBillDetailAdAttributeDAO { get; set; }

        public List<proc_ImportPurchaseBillDetailAdAttribute> GetAll()
        {
            try
            {
                return proc_ImportPurchaseBillDetailAdAttributeDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillDetailAdAttribute> GetByPBDetailId(long pBDetailId)
        {
            try
            {
                return proc_ImportPurchaseBillDetailAdAttributeDAO.GetByPBDetailId(pBDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillDetailAdAttribute> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return proc_ImportPurchaseBillDetailAdAttributeDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillDetailAdAttribute> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return proc_ImportPurchaseBillDetailAdAttributeDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn,
                    sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(proc_ImportPurchaseBillDetailAdAttribute _inv_PurchaseBillDetailAdAttribute)
        {
            try
            {
                return proc_ImportPurchaseBillDetailAdAttributeDAO.Add(_inv_PurchaseBillDetailAdAttribute);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(proc_ImportPurchaseBillDetailAdAttribute _inv_PurchaseBillDetailAdAttribute)
        {
            try
            {
                return proc_ImportPurchaseBillDetailAdAttributeDAO.Update(_inv_PurchaseBillDetailAdAttribute);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long PBDetailAdAttId)
        {
            try
            {
                return proc_ImportPurchaseBillDetailAdAttributeDAO.Delete(PBDetailAdAttId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
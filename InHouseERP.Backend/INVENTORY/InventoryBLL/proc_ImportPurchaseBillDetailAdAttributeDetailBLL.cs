using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class proc_ImportPurchaseBillDetailAdAttributeDetailBLL //: IDisposible
    {
        public proc_ImportPurchaseBillDetailAdAttributeDetailBLL()
        {
            //proc_ImportPurchaseBillDetailAdAttributeDetailDAO = proc_ImportPurchaseBillDetailAdAttributeDetail.GetInstanceThreadSafe;
            proc_ImportPurchaseBillDetailAdAttributeDetailDAO = new proc_ImportPurchaseBillDetailAdAttributeDetailDAO();
        }

        public proc_ImportPurchaseBillDetailAdAttributeDetailDAO proc_ImportPurchaseBillDetailAdAttributeDetailDAO { get; set; }

        public List<proc_ImportPurchaseBillDetailAdAttributeDetail> GetAll()
        {
            try
            {
                return proc_ImportPurchaseBillDetailAdAttributeDetailDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillDetailAdAttributeDetail> GetByPBDetailAdAttId(long pBDetailAdAttId)
        {
            try
            {
                return proc_ImportPurchaseBillDetailAdAttributeDetailDAO.GetByPBDetailAdAttId(pBDetailAdAttId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillDetailAdAttributeDetail> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return proc_ImportPurchaseBillDetailAdAttributeDetailDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillDetailAdAttributeDetail> GetPaged(int startRecordNo, int rowPerPage,
            string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return proc_ImportPurchaseBillDetailAdAttributeDetailDAO.GetPaged(startRecordNo, rowPerPage, whereClause,
                    sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(proc_ImportPurchaseBillDetailAdAttributeDetail _inv_PurchaseBillDetailAdAttributeDetail)
        {
            try
            {
                return proc_ImportPurchaseBillDetailAdAttributeDetailDAO.Add(_inv_PurchaseBillDetailAdAttributeDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(proc_ImportPurchaseBillDetailAdAttributeDetail _inv_PurchaseBillDetailAdAttributeDetail)
        {
            try
            {
                return proc_ImportPurchaseBillDetailAdAttributeDetailDAO.Update(_inv_PurchaseBillDetailAdAttributeDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long PBDetailAdAttDetailId)
        {
            try
            {
                return proc_ImportPurchaseBillDetailAdAttributeDetailDAO.Delete(PBDetailAdAttDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
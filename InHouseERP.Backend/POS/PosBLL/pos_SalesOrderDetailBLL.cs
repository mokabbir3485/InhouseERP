using System;
using System.Collections.Generic;
using PosDAL;
using PosEntity;

namespace PosBLL
{
    public class pos_SalesOrderDetailBLL //: IDisposible
    {
        public pos_SalesOrderDetailBLL()
        {
            //pos_SalesOrderDetailDAO = pos_SalesOrderDetail.GetInstanceThreadSafe;
            pos_SalesOrderDetailDAO = new pos_SalesOrderDetailDAO();
        }

        public pos_SalesOrderDetailDAO pos_SalesOrderDetailDAO { get; set; }

        public List<pos_SalesOrderDetail> SalesOrderReport(long SalesOrderId)
        {
            try
            {
                return pos_SalesOrderDetailDAO.SalesOrderReport(SalesOrderId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pos_SalesOrderDetail> SalesOrderDetailItemGetByCompanyId(int CompanyId)
        {
            try
            {
                return pos_SalesOrderDetailDAO.SalesOrderDetailItemGetByCompanyId(CompanyId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pos_SalesOrderDetail> GetBySalesOrderId(long salesOrderId)
        {
            try
            {
                return pos_SalesOrderDetailDAO.GetBySalesOrderId(salesOrderId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pos_SalesOrderDetail> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return pos_SalesOrderDetailDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_CompanyEmployeeItem> GetCompanyEmployeeItem()
        {
            try
            {
                return pos_SalesOrderDetailDAO.GetCompanyEmployeeItem();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pos_SalesOrderDetail> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return pos_SalesOrderDetailDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long PostSODetail(pos_SalesOrderDetail _pos_SalesOrderDetail)
        {
            try
            {
                return pos_SalesOrderDetailDAO.PostSODetail(_pos_SalesOrderDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public long PostAdditionalInfo(pos_SalesOrderDetail _pos_SalesOrderDetail)
        {
            try
            {
                return pos_SalesOrderDetailDAO.PostAdditionalInfo(_pos_SalesOrderDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(pos_SalesOrderDetail _pos_SalesOrderDetail)
        {
            try
            {
                return pos_SalesOrderDetailDAO.Update(_pos_SalesOrderDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateOrderQty(pos_SalesOrderDetail _pos_SalesOrderDetail)
        {
            try
            {
                return pos_SalesOrderDetailDAO.UpdateOrderQty(_pos_SalesOrderDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteSalesOrderDetail(long salesOrderDetailId)
        {
            try
            {
                return pos_SalesOrderDetailDAO.DeleteSalesOrderDetail(salesOrderDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int DeleteAdditionalInfo(long salesOrderDetailId)
        {
            try
            {
                return pos_SalesOrderDetailDAO.DeleteAdditionalInfo(salesOrderDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int Delete(long salesOrderDetailId)
        {
            try
            {
                return pos_SalesOrderDetailDAO.Delete(salesOrderDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pos_SalesOrderDetail> GetInvoiceDetail(long invoiceId)
        {
            try
            {
                return pos_SalesOrderDetailDAO.GetInvoiceDetail(invoiceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pos_SalesOrderDetail> GetItemForIWO(long salesOrderId)
        {
            try
            {
                return pos_SalesOrderDetailDAO.GetItemForIWO(salesOrderId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
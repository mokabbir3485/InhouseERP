using System;
using System.Collections;
using System.Collections.Generic;
using ExportDAL;
using ExportEntity;

namespace ExportBLL
{
    public class exp_InvoiceBLL //: IDisposible
    {
        public exp_InvoiceBLL()
        {
            //exp_InvoiceDAO = exp_Invoice.GetInstanceThreadSafe;
            exp_InvoiceDAO = new exp_InvoiceDAO();
        }

        public exp_InvoiceDAO exp_InvoiceDAO { get; set; }

        public List<exp_Invoice> GetPaymentProcessTypeAll()
        {
            try
            {
                return exp_InvoiceDAO.GetPaymentProcessTypeAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Invoice> GetAll()
        {
            try
            {
                return exp_InvoiceDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Invoice> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return exp_InvoiceDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<exp_Invoice> GetForCiUpdate(int CompanyId, long CommercialInvoiceId)
        {
            try
            {
                return exp_InvoiceDAO.GetForCiUpdate(CompanyId, CommercialInvoiceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Invoice> exp_Invoice_GetForEdit(DateTime fromDate, DateTime toDate, int? companyId)
        {
            try
            {
                return exp_InvoiceDAO.exp_Invoice_GetForEdit(fromDate, toDate, companyId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Invoice> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return exp_InvoiceDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Item> GetItemByInvoice(int invoiceId)
        {
            try
            {
                return exp_InvoiceDAO.GetItemByInvoice(invoiceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long GetMaxInvoiceNo(int ExporterId)
        {
            try
            {
                return exp_InvoiceDAO.GetMaxInvoiceNo(ExporterId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_InvoiceDetail> InvoiceDetailGetBySalesOrderId(long salesOrerId)
        {
            try
            {
                return exp_InvoiceDAO.InvoiceDetailGetBySalesOrderId(salesOrerId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_InvoiceDetail> InvoiceDetailGetByInvoiceId(long invoice)
        {
            try
            {
                return exp_InvoiceDAO.InvoiceDetailGetByInvoiceId(invoice);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string Add(exp_Invoice _exp_Invoice)
        {
            try
            {
                return exp_InvoiceDAO.Add(_exp_Invoice);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string Post(exp_Invoice _exp_Invoice)
        {
            try
            {
                return exp_InvoiceDAO.Post(_exp_Invoice);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long AddDetail(exp_InvoiceDetail _exp_InvoiceDetail)
        {
            try
            {
                return exp_InvoiceDAO.AddDetail(_exp_InvoiceDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(exp_Invoice _exp_Invoice)
        {
            try
            {
                return exp_InvoiceDAO.Update(_exp_Invoice);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long invoiceId)
        {
            try
            {
                return exp_InvoiceDAO.Delete(invoiceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int InvoiceDetailDeleteByInvoiceId(long invoiceId)
        {
            try
            {
                return exp_InvoiceDAO.InvoiceDetailDeleteByInvoiceId(invoiceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long AddInvoiceDetailTableHtmletail(exp_InvoiceDetail_TableHtml _exp_InvoiceDetail_TableHtml)
        {
            try
            {
                return exp_InvoiceDAO.AddInvoiceDetailTableHtml(_exp_InvoiceDetail_TableHtml);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long AddInvoiceDetailModifiedData(exp_InvoiceDetail_ModifiedData _exp_InvoiceDetail_ModifiedData)
        {
            try
            {
                return exp_InvoiceDAO.AddInvoiceDetailModifiedData(_exp_InvoiceDetail_ModifiedData);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_InvoiceDetail_TableHtml> GetInvoiceDetailTableHtml(int? invoiceId = null)
        {
            try
            {
                return exp_InvoiceDAO.GetInvoiceDetailTableHtml(invoiceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_InvoiceDetail_ModifiedData> GetInvoiceDetailModifiedData(int? invoiceId = null)
        {
            try
            {
                return exp_InvoiceDAO.GetInvoiceDetailModifiedData(invoiceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteInvoiceDetailModifiedData(long invoiceId)
        {
            try
            {
                return exp_InvoiceDAO.DeleteInvoiceDetailModifiedData(invoiceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IList GetInvoiceDetailModifiedDataForUpdate(long invoiceId)
        {
            try
            {
                return exp_InvoiceDAO.GetInvoiceDetailModifiedDataForUpdate(invoiceId);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
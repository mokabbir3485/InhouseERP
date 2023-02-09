using System;
using System.Collections;
using System.Collections.Generic;
using ExportDAL;
using ExportEntity;

namespace ExportBLL
{
    public class exp_CommercialInvoiceBLL //: IDisposible
    {
        public exp_CommercialInvoiceBLL()
        {
            //exp_CommercialInvoiceDAO = exp_CommercialInvoice.GetInstanceThreadSafe;
            exp_CommercialInvoiceDAO = new exp_CommercialInvoiceDAO();
        }

        public exp_CommercialInvoiceDAO exp_CommercialInvoiceDAO { get; set; }

        public List<exp_CommercialInvoice> GetPaymentProcessTypeAll()
        {
            try
            {
                return exp_CommercialInvoiceDAO.GetPaymentProcessTypeAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_CommercialInvoice> GetAll()
        {
            try
            {
                return exp_CommercialInvoiceDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_CommercialInvoice> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return exp_CommercialInvoiceDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_CommercialInvoice> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return exp_CommercialInvoiceDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(exp_CommercialInvoice _exp_CommercialInvoice)
        {
            try
            {
                return exp_CommercialInvoiceDAO.Add(_exp_CommercialInvoice);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeliveryChallanPost(exp_CommercialInvoice _exp_CommercialInvoice)
        {
            try
            {
                return exp_CommercialInvoiceDAO.DeliveryChallanPost(_exp_CommercialInvoice);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_CommercialInvoice> DeliveryChallanGetPaged(int startRecordNo, int rowPerPage,
            string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return exp_CommercialInvoiceDAO.DeliveryChallanGetPaged(startRecordNo, rowPerPage, whereClause,
                    sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Post(exp_CommercialInvoice _exp_CommercialInvoice)
        {
            try
            {
                return exp_CommercialInvoiceDAO.Post(_exp_CommercialInvoice);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long AddDetail(exp_CommercialInvoiceDetail _exp_CommercialInvoiceDetail)
        {
            try
            {
                return exp_CommercialInvoiceDAO.AddDetail(_exp_CommercialInvoiceDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_CommercialInvoiceDetail> CommercialInvoiceDetailGetByCommercialInvoiceId(long commercialInvoice)
        {
            try
            {
                return exp_CommercialInvoiceDAO.CommercialInvoiceDetailGetByCommercialInvoiceId(commercialInvoice);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long commercialInvoiceId)
        {
            try
            {
                return exp_CommercialInvoiceDAO.Delete(commercialInvoiceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateChallanGate(exp_CommercialInvoice _exp_CommercialInvoice)
        {
            try
            {
                return exp_CommercialInvoiceDAO.UpdateChallanGate(_exp_CommercialInvoice);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Item> GetItemByCI(long ciId)
        {
            try
            {
                return exp_CommercialInvoiceDAO.GetItemByCI(ciId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int CommercialInvoiceDetailDeleteByCommercialInvoiceId(long commercialInvoiceId)
        {
            try
            {
                return exp_CommercialInvoiceDAO.CommercialInvoiceDetailDeleteByCommercialInvoiceId(commercialInvoiceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //rakin

        public long PostHTMLTableForReport(exp_HTMLTableForReport _exp_HTMLTableForReport)
        {
            try
            {
                return exp_CommercialInvoiceDAO.PostHTMLTableForReport(_exp_HTMLTableForReport);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long AddCommercialInvoiceDetailTableHtml(
            exp_CommercialInvoiceDetail_TableHtml _exp_CommercialInvoiceDetail_TableHtml)
        {
            try
            {
                return exp_CommercialInvoiceDAO.AddCommercialInvoiceDetailTableHtml(
                    _exp_CommercialInvoiceDetail_TableHtml);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long AddCommercialInvoiceDetailModifiedData(
            exp_CommercialInvoiceDetail_ModifiedData _exp_CommercialInvoiceDetail_ModifiedData)
        {
            try
            {
                return exp_CommercialInvoiceDAO.AddCommercialInvoiceDetailModifiedData(
                    _exp_CommercialInvoiceDetail_ModifiedData);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_HTMLTableForReport> GetHTMLTableForReport(long DocumentId, string DocType)
        {
            try
            {
                return exp_CommercialInvoiceDAO.GetHTMLTableForReport(DocumentId, DocType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_CommercialInvoiceDetail_TableHtml> GetCommercialInvoiceDetailTableHtml(
            int? commercialInvoiceId = null)
        {
            try
            {
                return exp_CommercialInvoiceDAO.GetCommercialInvoiceDetailTableHtml(commercialInvoiceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_CommercialInvoiceDetail_ModifiedData> GetCommercialInvoiceDetailModifiedData(
            int? commercialInvoiceId = null)
        {
            try
            {
                return exp_CommercialInvoiceDAO.GetCommercialInvoiceDetailModifiedData(commercialInvoiceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteCommercialInvoiceDetailModifiedData(long commercialInvoiceId)
        {
            try
            {
                return exp_CommercialInvoiceDAO.DeleteCommercialInvoiceDetailModifiedData(commercialInvoiceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IList GetCommercialInvoiceDetailModifiedDataForCiUpdate(long commercialInvoiceId)
        {
            try
            {
                return exp_CommercialInvoiceDAO.GetCommercialInvoiceDetailModifiedDataForCiUpdate(commercialInvoiceId);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IList GetCommercialInvoiceDetailModifiedDataGetByInvoiceId(long invoiceId)
        {
            try
            {
                return exp_CommercialInvoiceDAO.GetCommercialInvoiceDetailModifiedDataGetByInvoiceId(invoiceId);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
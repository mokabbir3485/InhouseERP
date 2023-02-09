using System;
using System.Collections.Generic;
using System.Data.Common;
using InventoryDAL;
using PosDAL;
using PosEntity;
using SecurityEntity.POS.PosEntity;
using SecurityEntity.RECEIVABLE.ReceivableEntity;

namespace PosBLL
{
    public class pos_SalesInvoiceBLL
    {
        public pos_SalesInvoiceBLL()
        {
            pos_SalesInvoiceDAO = new pos_SalesInvoiceDAO();
        }

        public pos_SalesInvoiceDAO pos_SalesInvoiceDAO { get; set; }
        public List<pos_SalesInvoice> GetDynamicForSalesInvoice(string whereCondition,
            string orderByExpression)
        {
            try
            {
                return pos_SalesInvoiceDAO.GetDynamicForSalesInvoice(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pos_SalesInvoice> GetInvoiceWithAcknowledgement(Int32 companyId)
        {
            try
            {
                return pos_SalesInvoiceDAO.GetInvoiceWithAcknowledgement( companyId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesInvoiceDetail> GetSalesInvoiceDetailBySalesInvoiceId(long SalesInvoiceId)
        {
            try
            {
                return pos_SalesInvoiceDAO.GetSalesInvoiceDetailBySalesInvoiceId(SalesInvoiceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<rcv_SaleAcknowledgement> GetReportForCreditAcknoledge(long SaleAcknowledgementId)
        {
            try
            {
                return pos_SalesInvoiceDAO.GetReportForCreditAcknoledge(SaleAcknowledgementId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public long Post(pos_SalesInvoice pos_SalesInvoice)
        {
            try
            {
                return pos_SalesInvoiceDAO.Post(pos_SalesInvoice);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public long PostManualInvoice(pos_SalesInvoice pos_SalesInvoice)
        {
            try
            {
                return pos_SalesInvoiceDAO.PostManualInvoice(pos_SalesInvoice);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public long PostSalesInvoiceDetail(pos_SalesInvoiceDetail pos_SalesInvoiceDetail)
        {
            try
            {
                return pos_SalesInvoiceDAO.PostSalesInvoiceDetail(pos_SalesInvoiceDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public long PostManualInvoiceDetail(pos_SalesInvoiceDetail pos_SalesInvoiceDetail)
        {
            try
            {
                return pos_SalesInvoiceDAO.PostManualInvoiceDetail(pos_SalesInvoiceDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Int32 AdditionalSalesInvoiceCostSave(pos_AdditionalSalesInvoiceCost _pos_AdditionalSalesInvoiceCost)
        {
            try
            {
                return pos_SalesInvoiceDAO.AdditionalSalesInvoiceCostSave(_pos_AdditionalSalesInvoiceCost);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesInvoice> GetCompanyForPayment()
        {
            try
            {
                return pos_SalesInvoiceDAO.GetCompanyForPayment();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesInvoice> GetAllManualSalesInvoice()
        {
            try
            {
                return pos_SalesInvoiceDAO.GetAllManualSalesInvoice();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<pos_SalesInvoiceTemp> GetAllSalesInvoice()
        {
            try
            {
                return pos_SalesInvoiceDAO.GetAllSalesInvoice();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeletedSalesInvoiceDetailBySalesInvoiceDetailId(long SalesInvoiceDetailId)
        {
            try
            {
                return pos_SalesInvoiceDAO.DeletedSalesInvoiceDetailBySalesInvoiceDetailId(SalesInvoiceDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int DeletedManualInvoiceDetailByManualInvoiceDetailId(long ManualInvoiceDetailId)
        {
            try
            {
                return pos_SalesInvoiceDAO.DeletedManualInvoiceDetailByManualInvoiceDetailId(ManualInvoiceDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Int64 SaveSalesInvoiceAndDeliveryId(long SalesInvoiceId,long DeliveryId)
        {
            try
            {
                return pos_SalesInvoiceDAO.SaveSalesInvoice_StockDeliveryId(SalesInvoiceId, DeliveryId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public long PostAcknowledge(pos_SalesInvoice rcv_Acknowledge)
        {
            try
            {
                return pos_SalesInvoiceDAO.PostAcknowledge(rcv_Acknowledge);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public Int64 GetMaxSalesInvoiceNo()
        {
            try
            {
                return pos_SalesInvoiceDAO.GetMaxSalesInvoiceNo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Int64 GetMaxManualInvoiceNo()
        {
            try
            {
                return pos_SalesInvoiceDAO.GetMaxManualInvoiceNo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public string GetMaxAcknowledgementNo(DateTime AcknowledgementDate)
        {
            try
            {
                return pos_SalesInvoiceDAO.GetMaxAcknowledgementNo(AcknowledgementDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesInvoice> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return pos_SalesInvoiceDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesInvoice> GetPagedManualInvoice(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return pos_SalesInvoiceDAO.GetPagedManualInvoice(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pos_AdditionalSalesInvoiceCost> AdditionalSalesInvoiceGetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
           string sortOrder, ref int rows)
        {
            try
            {
                return pos_SalesInvoiceDAO.AdditionalSalesInvoiceGetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesInvoice> GetPagedAcknowledge(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return pos_SalesInvoiceDAO.GetPagedAcknowledge(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //public DbDataReader GetMaxSalesInvoiceNo()
        //{
        //    try
        //    {
        //        return pos_SalesInvoiceDAO.GetMaxSalesInvoiceNo();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        public List<pos_SalesInvoiceDetail> GetSalesInvoiceDetail(long SalesInvoiceId)
        {
            try
            {
                return pos_SalesInvoiceDAO.GetSalesInvoiceDetail(SalesInvoiceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesInvoiceDetail> GetManualInvoiceDetail(long ManualInvoiceId)
        {
            try
            {
                return pos_SalesInvoiceDAO.GetManualInvoiceDetail(ManualInvoiceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesInvoiceDetail> GetSalesInvoiceDetailForReport(long SalesInvoiceId, int? CurrencyId = null)
        {
            try
            {
                return pos_SalesInvoiceDAO.GetSalesInvoiceDetailForReport(SalesInvoiceId, CurrencyId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_Mushak_6_3> GetMushak_6_3BySalesInvoiceId(Int32? CompanyId = null, Int32? SalesInvoiceId = null)
        {
            try
            {
                return pos_SalesInvoiceDAO.GetMushak_6_3BySalesInvoiceId(CompanyId, SalesInvoiceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesInvoiceDetail> GetManualInvoiceDetailForReport(long ManualInvoiceId)
        {
            try
            {
                return pos_SalesInvoiceDAO.GetManualInvoiceDetailForReport(ManualInvoiceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesInvoiceDetail> GetManualInvoiceNoExist(string ManualInvoiceNo)
        {
            try
            {
                return pos_SalesInvoiceDAO.GetManualInvoiceNoExist(ManualInvoiceNo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Xrpt_pos_SalesInvoiceDetail> GetByDeliveryId(string DeliveryIds)
        {
            try
            {
                return pos_SalesInvoiceDAO.GetDeliveryIds(DeliveryIds);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesInvoice> GetNumberPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return pos_SalesInvoiceDAO.GetNumberPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
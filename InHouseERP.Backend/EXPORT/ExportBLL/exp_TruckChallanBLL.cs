using System;
using System.Collections.Generic;
using ExportDAL;
using ExportEntity;

namespace ExportBLL
{
    public class exp_TruckChallanBLL //: IDisposible
    {
        public exp_TruckChallanBLL()
        {
            //exp_TruckChallanDAO = exp_TruckChallan.GetInstanceThreadSafe;
            exp_TruckChallanDAO = new exp_TruckChallanDAO();
        }

        public exp_TruckChallanDAO exp_TruckChallanDAO { get; set; }

        public List<exp_TruckChallan> Get(long? CommercialInvoiceId)
        {
            try
            {
                return exp_TruckChallanDAO.Get(CommercialInvoiceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Post(exp_TruckChallan _exp_TruckChallan)
        {
            try
            {
                return exp_TruckChallanDAO.Post(_exp_TruckChallan);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteTruckChallanByCommercialInvoiceId(long commercialInvoiceId)
        {
            try
            {
                return exp_TruckChallanDAO.DeleteTruckChallanByCommercialInvoiceId(commercialInvoiceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_TruckChallan> TruckChallanGetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return exp_TruckChallanDAO.TruckChallanGetPaged(startRecordNo, rowPerPage, whereClause, sortColumn,
                    sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
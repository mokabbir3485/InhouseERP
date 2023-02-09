using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_InternalWorkOrderDetailReportDAO
    {
        private static volatile inv_InternalWorkOrderDetailReportDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_InternalWorkOrderDetailReportDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_InternalWorkOrderDetailReportDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_InternalWorkOrderDetailReportDAO();
                    }

                return instance;
            }
        }

        public static inv_InternalWorkOrderDetailReportDAO GetInstance()
        {
            if (instance == null) instance = new inv_InternalWorkOrderDetailReportDAO();
            return instance;
        }

        public List<inv_InternalWorkOrderReport> GetByInternalWorkOrderId(long internalWorkOrderId)
        {
            try
            {
                var inv_InternalWorkOrderDetailLstForReport = new List<inv_InternalWorkOrderReport>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@InternalWorkOrderId", internalWorkOrderId, DbType.Int64, ParameterDirection.Input)
                };
                inv_InternalWorkOrderDetailLstForReport = dbExecutor.FetchData<inv_InternalWorkOrderReport>(
                    CommandType.StoredProcedure, "xRpt_inv_InternalWorkOrderByInternalWorkOrderId", colparameters);
                return inv_InternalWorkOrderDetailLstForReport;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using ExportEntity;

namespace ExportDAL
{
    public class exp_ExportImportReportsDAO
    {
        private static volatile exp_ExportImportReportsDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public exp_ExportImportReportsDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static exp_ExportImportReportsDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new exp_ExportImportReportsDAO();
                    }

                return instance;
            }
        }

        public static exp_ExportImportReportsDAO GetInstance()
        {
            if (instance == null) instance = new exp_ExportImportReportsDAO();
            return instance;
        }

        public List<xRpt_ExpImp_LabelExport> GetExpImpLabelExport(DateTime FromDate, DateTime ToDate,
            string CategoryType)
        {
            try
            {
                var xRpt_ExpImp_LabelExport = new List<xRpt_ExpImp_LabelExport>();
                var colparameters = new Parameters[3]
                {
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@CategoryType", CategoryType, DbType.String, ParameterDirection.Input)
                };
                xRpt_ExpImp_LabelExport = dbExecutor.FetchData<xRpt_ExpImp_LabelExport>(CommandType.StoredProcedure,
                    "xRpt_ExpImp_LabelExport", colparameters);
                return xRpt_ExpImp_LabelExport;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<xRpt_ExpImp_ImportExportBalance> GetImportExportBalanceReport(DateTime FromDate, DateTime ToDate)
        {
            try
            {
                var xRpt_ExpImp_ImportExportBalance = new List<xRpt_ExpImp_ImportExportBalance>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                };
                xRpt_ExpImp_ImportExportBalance =
                    dbExecutor.FetchData<xRpt_ExpImp_ImportExportBalance>(CommandType.StoredProcedure,
                        "xRpt_ExpImp_ImportExportBalance", colparameters);
                return xRpt_ExpImp_ImportExportBalance;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<xRpt_expimp_TotalRawMaterialAndMachineryStatus> GetImportReport(DateTime FromDate, DateTime ToDate,
            string CategoryType)
        {
            try
            {
                var xRpt_expimp_TotalRawMaterialAndMachineryStatusList =
                    new List<xRpt_expimp_TotalRawMaterialAndMachineryStatus>();
                var colparameters = new Parameters[3]
                {
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@CategoryType", CategoryType, DbType.String, ParameterDirection.Input)
                };
                xRpt_expimp_TotalRawMaterialAndMachineryStatusList =
                    dbExecutor.FetchData<xRpt_expimp_TotalRawMaterialAndMachineryStatus>(CommandType.StoredProcedure,
                        "xRpt_expimp_TotalRawMaterialAndMachineryStatus", colparameters);
                return xRpt_expimp_TotalRawMaterialAndMachineryStatusList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
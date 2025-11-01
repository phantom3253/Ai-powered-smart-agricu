import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExclamationTriangleIcon, InformationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

const alertConfig = {
  critical: {
    icon: ExclamationTriangleIcon,
    bgClass: 'bg-red-100 border-red-500 text-red-800',
    iconClass: 'text-red-500',
  },
  warning: {
    icon: ExclamationTriangleIcon,
    bgClass: 'bg-yellow-100 border-yellow-500 text-yellow-800',
    iconClass: 'text-yellow-500',
  },
  info: {
    icon: InformationCircleIcon,
    bgClass: 'bg-blue-100 border-blue-500 text-blue-800',
    iconClass: 'text-blue-500',
  },
};

const Alerts = ({ alerts, t }) => {
  const hasAlerts = alerts && alerts.length > 0;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{t('alerts_title')}</h2>
      <div className="space-y-3">
        <AnimatePresence mode="wait">
          {hasAlerts ? (
            // This part runs when there ARE alerts
            alerts.map((alert) => {
              const config = alertConfig[alert.type] || alertConfig.info;
              const Icon = config.icon;

              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`border-l-4 p-4 rounded-r-lg ${config.bgClass}`}
                  role="alert"
                >
                  <div className="flex">
                    <div className="py-1">
                      <Icon className={`h-6 w-6 ${config.iconClass}`} />
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">{t(alert.messageKey)}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            // ✨ NEW: This part runs when there are NO alerts
            <motion.div
              key="no-alerts"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.3 }}
              className="border-l-4 p-4 rounded-r-lg bg-green-100 border-green-500 text-green-800"
              role="status"
            >
              <div className="flex">
                <div className="py-1">
                  <CheckCircleIcon className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">{t('no_alerts_message')}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Alerts;


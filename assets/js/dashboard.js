/* ==========================================================================
   STACKLY — Chart.js setups
   Home hero chart + full demo dashboard (dashboard.html)
   ========================================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const chartDefaults = {
    color: "#9aa3c7",
    font: { family: "Inter, sans-serif", size: 12 },
  };
  Chart.defaults.font.family = chartDefaults.font.family;
  Chart.defaults.color = chartDefaults.color;
  Chart.defaults.borderColor = "rgba(255,255,255,0.06)";
  Chart.defaults.plugins.tooltip.backgroundColor = "#131736";
  Chart.defaults.plugins.tooltip.borderColor = "rgba(99,102,241,0.5)";
  Chart.defaults.plugins.tooltip.borderWidth = 1;
  Chart.defaults.plugins.tooltip.titleColor = "#ffffff";
  Chart.defaults.plugins.tooltip.bodyColor = "#c7c9ff";
  Chart.defaults.animation.duration = 1600;
  Chart.defaults.animation.easing = "easeOutQuart";
  Chart.defaults.responsive = true;
  Chart.defaults.maintainAspectRatio = false;

  const gridColor = "rgba(255,255,255,0.06)";

  /* ---------------------------------------------------------------
     Home hero chart (index.html)
  --------------------------------------------------------------- */
  const heroChartEl = document.getElementById("heroChart");
  if (heroChartEl) {
    const ctx = heroChartEl.getContext("2d");
    const labels = ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "24:00"];
    const fill = ctx.createLinearGradient(0, 0, 0, 200);
    fill.addColorStop(0, "rgba(99,102,241,0.5)");
    fill.addColorStop(1, "rgba(99,102,241,0)");

    new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Uptime",
            data: [99.9, 99.92, 99.88, 99.97, 99.95, 99.99, 99.98, 100, 99.99],
            borderColor: "#6366f1",
            backgroundColor: fill,
            fill: true,
            tension: 0.45,
            borderWidth: 3,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointBackgroundColor: "#22d3ee",
            pointBorderColor: "#fff",
          },
        ],
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          y: {
            min: 99.8,
            max: 100.05,
            grid: { color: gridColor },
            ticks: { callback: (v) => v.toFixed(2) + "%", maxTicksLimit: 5 },
          },
          x: { grid: { display: false }, ticks: { maxRotation: 0 } },
        },
        interaction: { intersect: false, mode: "index" },
      },
    });
  }

  /* ---------------------------------------------------------------
     Demo dashboard charts (dashboard.html)
  --------------------------------------------------------------- */
  const dashUptime = document.getElementById("dashUptime");
  const dashTraffic = document.getElementById("dashTraffic");
  const dashLatency = document.getElementById("dashLatency");
  const dashServices = document.getElementById("dashServices");
  const dashRegions = document.getElementById("dashRegions");

  const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);

  if (dashUptime) {
    const ctx = dashUptime.getContext("2d");
    const fill = ctx.createLinearGradient(0, 0, 0, 220);
    fill.addColorStop(0, "rgba(34,211,238,0.4)");
    fill.addColorStop(1, "rgba(34,211,238,0)");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: hours,
        datasets: [
          {
            label: "Uptime %",
            data: hours.map(() => 99.9 + Math.random() * 0.09),
            borderColor: "#22d3ee",
            backgroundColor: fill,
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 0,
          },
        ],
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          y: { min: 99.8, max: 100, grid: { color: gridColor } },
          x: { grid: { display: false }, ticks: { maxTicksLimit: 8 } },
        },
      },
    });
  }

  if (dashTraffic) {
    new Chart(dashTraffic.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Requests (M)",
            data: [8.2, 9.1, 8.8, 10.4, 12.1, 14.6, 13.2],
            backgroundColor: [
              "#6366f1", "#6366f1", "#6366f1", "#8b5cf6", "#22d3ee", "#22d3ee", "#22d3ee",
            ],
            borderRadius: 8,
            borderSkipped: false,
          },
        ],
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          y: { grid: { color: gridColor }, beginAtZero: true },
          x: { grid: { display: false } },
        },
      },
    });
  }

  if (dashLatency) {
    new Chart(dashLatency.getContext("2d"), {
      type: "line",
      data: {
        labels: hours,
        datasets: [
          {
            label: "p50",
            data: hours.map(() => 38 + Math.random() * 12),
            borderColor: "#22d3ee",
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 0,
          },
          {
            label: "p95",
            data: hours.map(() => 70 + Math.random() * 30),
            borderColor: "#fbbf24",
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 0,
          },
          {
            label: "p99",
            data: hours.map(() => 110 + Math.random() * 60),
            borderColor: "#f87171",
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 0,
          },
        ],
      },
      options: {
        plugins: {
          legend: { labels: { usePointStyle: true, boxWidth: 8 } },
        },
        scales: {
          y: { grid: { color: gridColor }, beginAtZero: true },
          x: { grid: { display: false }, ticks: { maxTicksLimit: 8 } },
        },
      },
    });
  }

  if (dashServices) {
    new Chart(dashServices.getContext("2d"), {
      type: "doughnut",
      data: {
        labels: ["API Gateway", "Auth", "Orders", "Payments", "Realtime"],
        datasets: [
          {
            data: [28, 18, 24, 15, 15],
            backgroundColor: ["#6366f1", "#8b5cf6", "#22d3ee", "#2dd4bf", "#fbbf24"],
            borderColor: "#0e1124",
            borderWidth: 4,
            hoverOffset: 10,
          },
        ],
      },
      options: {
        cutout: "68%",
        plugins: {
          legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 8, padding: 14 } },
        },
      },
    });
  }

  if (dashRegions) {
    new Chart(dashRegions.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["us-east", "us-west", "eu-west", "ap-south", "ap-northeast", "sa-east"],
        datasets: [
          {
            label: "Latency (ms)",
            data: [42, 48, 39, 61, 58, 74],
            backgroundColor: "rgba(99,102,241,0.75)",
            borderRadius: 8,
            borderSkipped: false,
          },
        ],
      },
      options: {
        indexAxis: "y",
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: gridColor }, beginAtZero: true },
          y: { grid: { display: false } },
        },
      },
    });
  }

  /* ---------------------------------------------------------------
     Home page — Real-Time Monitoring resource chart (index.html)
  --------------------------------------------------------------- */
  const realtimeChart = document.getElementById("realtimeChart");
  if (realtimeChart) {
    const ts = Array.from({ length: 30 }, (_, i) => `${String(i).padStart(2, "0")}m`);
    new Chart(realtimeChart.getContext("2d"), {
      type: "line",
      data: {
        labels: ts,
        datasets: [
          {
            label: "CPU %",
            data: ts.map(() => 28 + Math.random() * 30),
            borderColor: "#6366f1",
            backgroundColor: "rgba(99,102,241,0.1)",
            fill: true,
            tension: 0.4,
            borderWidth: 2.5,
            pointRadius: 0,
          },
          {
            label: "Memory %",
            data: ts.map(() => 52 + Math.random() * 18),
            borderColor: "#22d3ee",
            backgroundColor: "rgba(34,211,238,0.08)",
            fill: true,
            tension: 0.4,
            borderWidth: 2.5,
            pointRadius: 0,
          },
          {
            label: "Network Mb/s",
            data: ts.map(() => 300 + Math.random() * 500),
            borderColor: "#fbbf24",
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 0,
            yAxisID: "yNet",
          },
        ],
      },
      options: {
        plugins: { legend: { labels: { usePointStyle: true, boxWidth: 8 } } },
        scales: {
          y: {
            min: 0,
            max: 100,
            grid: { color: gridColor },
            title: { display: true, text: "%" },
          },
          yNet: {
            position: "right",
            grid: { drawOnChartArea: false },
            title: { display: true, text: "Mb/s" },
          },
          x: { grid: { display: false }, ticks: { maxTicksLimit: 8 } },
        },
        interaction: { intersect: false, mode: "index" },
      },
    });
  }

  /* ---------------------------------------------------------------
     Home page — Analytics performance chart (index.html)
  --------------------------------------------------------------- */
  const analyticsChart = document.getElementById("analyticsChart");
  if (analyticsChart) {
    new Chart(analyticsChart.getContext("2d"), {
      data: {
        labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"],
        datasets: [
          {
            type: "bar",
            label: "Requests (M)",
            data: [62, 68, 71, 84, 79, 96, 105, 118],
            backgroundColor: "rgba(99,102,241,0.7)",
            borderRadius: 6,
            borderSkipped: false,
            yAxisID: "yReq",
          },
          {
            type: "line",
            label: "P95 latency (ms)",
            data: [132, 126, 121, 114, 108, 101, 96, 90],
            borderColor: "#fbbf24",
            backgroundColor: "rgba(251,191,36,0.12)",
            fill: true,
            tension: 0.4,
            borderWidth: 2.5,
            pointRadius: 0,
            yAxisID: "yLat",
          },
        ],
      },
      options: {
        plugins: { legend: { labels: { usePointStyle: true, boxWidth: 8 } } },
        scales: {
          yReq: {
            beginAtZero: true,
            grid: { color: gridColor },
            title: { display: true, text: "Requests (M)" },
          },
          yLat: {
            position: "right",
            grid: { drawOnChartArea: false },
            title: { display: true, text: "P95 (ms)" },
          },
          x: { grid: { display: false } },
        },
        interaction: { intersect: false, mode: "index" },
      },
    });
  }

  /* ---------------------------------------------------------------
     Sidebar dashboards — Admin analytics (admin-dashboard.html)
  --------------------------------------------------------------- */
  const chUserGrowth = document.getElementById("chUserGrowth");
  if (chUserGrowth) {
    new Chart(chUserGrowth.getContext("2d"), {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        datasets: [
          {
            label: "Total users",
            data: [3200, 4100, 5300, 6400, 7900, 9400, 11100, 12800],
            borderColor: "#6366f1",
            backgroundColor: "rgba(99,102,241,0.12)",
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 0,
          },
          {
            label: "Active users",
            data: [2100, 2800, 3400, 4200, 5100, 6200, 7300, 8400],
            borderColor: "#22d3ee",
            backgroundColor: "rgba(34,211,238,0.08)",
            fill: true,
            tension: 0.4,
            borderWidth: 2.5,
            pointRadius: 0,
          },
        ],
      },
      options: {
        plugins: { legend: { labels: { usePointStyle: true, boxWidth: 8 } } },
        scales: {
          y: { grid: { color: gridColor }, beginAtZero: true },
          x: { grid: { display: false } },
        },
        interaction: { intersect: false, mode: "index" },
      },
    });
  }

  const chServerPerf = document.getElementById("chServerPerf");
  if (chServerPerf) {
    new Chart(chServerPerf.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["web-01", "web-02", "api-01", "db-01", "db-02", "cache-01", "worker-01"],
        datasets: [
          {
            label: "CPU %",
            data: [42, 38, 56, 71, 64, 33, 49],
            backgroundColor: "rgba(99,102,241,0.75)",
            borderRadius: 6,
            borderSkipped: false,
          },
          {
            label: "Memory %",
            data: [61, 57, 48, 79, 74, 42, 53],
            backgroundColor: "rgba(34,211,238,0.7)",
            borderRadius: 6,
            borderSkipped: false,
          },
        ],
      },
      options: {
        plugins: { legend: { labels: { usePointStyle: true, boxWidth: 8 } } },
        scales: {
          y: { grid: { color: gridColor }, beginAtZero: true, max: 100 },
          x: { grid: { display: false } },
        },
      },
    });
  }

  const chSystemUptime = document.getElementById("chSystemUptime");
  if (chSystemUptime) {
    const ctx = chSystemUptime.getContext("2d");
    const fill = ctx.createLinearGradient(0, 0, 0, 220);
    fill.addColorStop(0, "rgba(45,212,191,0.4)");
    fill.addColorStop(1, "rgba(45,212,191,0)");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "System uptime %",
            data: [99.92, 99.95, 99.9, 99.98, 99.96, 100, 99.99],
            borderColor: "#2dd4bf",
            backgroundColor: fill,
            fill: true,
            tension: 0.45,
            borderWidth: 3,
            pointRadius: 0,
          },
        ],
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          y: { min: 99.8, max: 100.05, grid: { color: gridColor }, ticks: { callback: (v) => v.toFixed(2) + "%", maxTicksLimit: 5 } },
          x: { grid: { display: false } },
        },
      },
    });
  }

  const chAlerts = document.getElementById("chAlerts");
  if (chAlerts) {
    new Chart(chAlerts.getContext("2d"), {
      type: "doughnut",
      data: {
        labels: ["Critical", "Warning", "Resolved"],
        datasets: [
          {
            data: [8, 23, 41],
            backgroundColor: ["#f43f5e", "#fbbf24", "#2dd4bf"],
            borderColor: "#0e1124",
            borderWidth: 4,
            hoverOffset: 10,
          },
        ],
      },
      options: {
        cutout: "66%",
        plugins: {
          legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 8, padding: 14 } },
        },
      },
    });
  }

  const chRevenue = document.getElementById("chRevenue");
  if (chRevenue) {
    new Chart(chRevenue.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        datasets: [
          {
            label: "MRR ($K)",
            data: [18, 22, 27, 31, 38, 44, 51, 58],
            backgroundColor: "rgba(139,92,246,0.75)",
            borderRadius: 6,
            borderSkipped: false,
          },
          {
            label: "Subscriptions",
            data: [240, 290, 350, 410, 480, 560, 650, 740],
            borderColor: "#22d3ee",
            type: "line",
            tension: 0.4,
            borderWidth: 2.5,
            pointRadius: 0,
            yAxisID: "ySub",
          },
        ],
      },
      options: {
        plugins: { legend: { labels: { usePointStyle: true, boxWidth: 8 } } },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: gridColor },
            title: { display: true, text: "$K" },
          },
          ySub: {
            position: "right",
            grid: { drawOnChartArea: false },
            title: { display: true, text: "Subscriptions" },
          },
          x: { grid: { display: false } },
        },
        interaction: { intersect: false, mode: "index" },
      },
    });
  }
});

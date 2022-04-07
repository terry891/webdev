#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


print("Hello World")


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'web.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()

# py manage.py runserver
# py manage.py migrate
# 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